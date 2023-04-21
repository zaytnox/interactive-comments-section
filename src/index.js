import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './routes/App';
import '../public/data/data.json';

const root = createRoot(document.querySelector('.app'));
root.render(<App />);
