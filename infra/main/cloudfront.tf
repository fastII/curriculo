resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.project}-oac"
  description                       = "OAC do bucket ${local.site_bucket}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

data "aws_cloudfront_cache_policy" "optimized" {
  name = "Managed-CachingOptimized"
}

# Cabeçalhos de segurança (HSTS, CSP, anti-clickjacking etc.)
resource "aws_cloudfront_response_headers_policy" "security" {
  name    = "${var.project}-security-headers"
  comment = "Cabeçalhos de segurança do site"

  security_headers_config {
    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = true
      preload                    = true
      override                   = true
    }
    content_type_options {
      override = true
    }
    frame_options {
      frame_option = "DENY"
      override     = true
    }
    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }
    content_security_policy {
      content_security_policy = var.content_security_policy
      override                = true
    }
  }

  custom_headers_config {
    items {
      header   = "Permissions-Policy"
      value    = "camera=(), microphone=(), geolocation=(), interest-cohort=()"
      override = true
    }
  }
}

# Redireciona www -> domínio raiz (301) na borda
resource "aws_cloudfront_function" "redirect_www" {
  name    = "${var.project}-redirect-www"
  runtime = "cloudfront-js-2.0"
  comment = "301 de www para o dominio raiz"
  publish = true
  code    = <<-JS
    function handler(event) {
      var req = event.request;
      var host = req.headers.host ? req.headers.host.value : "";
      if (host === "${local.www_domain}") {
        var qs = Object.keys(req.querystring).map(function (k) {
          return k + "=" + req.querystring[k].value;
        }).join("&");
        return {
          statusCode: 301,
          statusDescription: "Moved Permanently",
          headers: { location: { value: "https://${var.domain_name}" + req.uri + (qs ? "?" + qs : "") } }
        };
      }
      return req;
    }
  JS
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  http_version        = "http2and3"
  comment             = "Site ${var.domain_name}"
  default_root_object = "index.html"
  price_class         = var.price_class
  aliases             = local.aliases

  origin {
    origin_id                = "s3-site"
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id           = "s3-site"
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD", "OPTIONS"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    cache_policy_id            = data.aws_cloudfront_cache_policy.optimized.id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security.id

    dynamic "function_association" {
      for_each = var.enable_www ? [1] : []
      content {
        event_type   = "viewer-request"
        function_arn = aws_cloudfront_function.redirect_www.arn
      }
    }
  }

  # Com OAC, arquivo inexistente no S3 retorna 403: mostramos a página 404
  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 60
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 60
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.site.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}
