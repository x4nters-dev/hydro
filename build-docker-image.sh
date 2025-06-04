docker buildx build \
  --platform linux/arm64 \
  -t hydro:arm64 \
  -f Dockerfile .