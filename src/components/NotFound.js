import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NotFound.css';

export default function NotFound() {
  return (
    <div id="notfound">
      <h1>Page Not Found</h1>
      <p>We're sorry, but the page you requested could not be found.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
}
