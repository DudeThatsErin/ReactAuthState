/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
<<<<<<< HEAD
import App from '../src/App';
=======
import App from '../App';
>>>>>>> 1a5d365525d6312a80d3dc22b58eaedd8a956cc2

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
