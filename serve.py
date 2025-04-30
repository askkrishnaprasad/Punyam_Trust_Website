import http.server
import socketserver
import os

# Serve from root directory instead of website subdirectory
# os.chdir('website')  # Commented out to serve from the root

# Set the port
PORT = 8000

# Create the server
Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"Serving website at http://localhost:{PORT}")
print("Press Ctrl+C to stop the server")

# Start the server
httpd.serve_forever() 