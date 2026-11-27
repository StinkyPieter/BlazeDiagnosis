
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { CardLabel, CardTitle } from './card';

describe('Card typography', () => {
  it('renders CardLabel as a paragraph', () => {
    const markup = renderToStaticMarkup(
      <CardLabel>Total customers</CardLabel>,
    );

    expect(markup).toContain('<p');
    expect(markup).toContain('Total customers');
    expect(markup).not.toContain('<h2');
  });

  it('keeps CardTitle as a heading', () => {
    const markup = renderToStaticMarkup(
      <CardTitle>Customer directory</CardTitle>,
    );

    expect(markup).toContain('<h2');
    expect(markup).toContain('Customer directory');
  });
});
