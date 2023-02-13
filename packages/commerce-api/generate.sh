export MSYS_NO_PATHCONV=1
rm -rf api
rm -rf models
docker run --rm -v  ${PWD}:/local openapitools/openapi-generator-cli:v6.3.0 generate -i https://raw.githubusercontent.com/go-saas/commerce/main/openapi/commerce-merged.swagger.json -g typescript-axios -o /local -c /local/tools/config.json
