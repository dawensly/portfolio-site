# Portfolio

Personal portfolio site to showcase projects and other stuff

**Live site:** https://dawensly.com

## Features
- One-page layout with a skills dock and a separate Projects page
- Light/dark theme with saved preference (CSS variables + localStorage)
- Responsive design, no frameworks

## Built With
- HTML, CSS, vanilla JavaScript
- AWS: S3, CloudFront, Route 53, IAM

## Deployment
Deployed with the AWS CLI using a least-privilege IAM user:

    aws s3 sync . s3://<bucket> --exclude ".git/*" --exclude "ARCHIVES/*"
    aws cloudfront create-invalidation --distribution-id <id> --paths "/*"