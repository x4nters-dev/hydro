docker buildx build \
  --platform linux/arm64 \
  -t hydro:arm64 \
  -f Dockerfile .

docker save hydro:arm64 | gzip > hydro.tar.gz
