# -*- coding: utf-8 -*-
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class CustomHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        # Force fresh 200 response on all mobile and desktop devices by stripping caching headers
        if 'If-Modified-Since' in self.headers:
            del self.headers['If-Modified-Since']
        if 'If-None-Match' in self.headers:
            del self.headers['If-None-Match']
        return super().send_head()

    def end_headers(self):
        # Aggressive no-cache headers for instant updates across WiFi
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run(port=8080):
    directory = os.path.dirname(os.path.abspath(__file__))
    os.chdir(directory)
    server_address = ('0.0.0.0', port)
    httpd = ThreadingHTTPServer(server_address, CustomHandler)
    print(f"Anti-cache Threading HTTP server running on http://0.0.0.0:{port} in {directory}")
    sys.stdout.flush()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()

if __name__ == '__main__':
    run()
