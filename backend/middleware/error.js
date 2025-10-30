export function notFound(req, res, next) {
  res.status(404).json({ error: "Not found" });
}

export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  if (status >= 500) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
  res.status(status).json({ error: message });
}


