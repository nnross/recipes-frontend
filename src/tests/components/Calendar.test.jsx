describe('Calendar tests', () => {
  describe('Calendar renders', () => {
    const component = render(<Calendar id="test" />);

    const container = component.container.querySelector('#test');
    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('calendar');

    expect(component.getByRole('button', { name: 'M' })).toBeVisible();
    expect(component.getByRole('button', { name: 'T' })).toBeVisible();
    expect(component.getByRole('button', { name: 'W' })).toBeVisible();
    expect(component.getByRole('button', { name: 'F' })).toBeVisible();
    expect(component.getByRole('button', { name: 'S' })).toBeVisible();
    expect(component.getByRole('button', { name: 'S' })).toBeVisible();
  });
  describe('recipe shows as filled or done or empty renders', () => {
    const component = render(<Calendar id="test" monday={3} tuesday={2} wednesday={1} />);

    const container = component.container.querySelector('#test');
    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('calendar');

    expect(component.getByRole('button', { name: 'M' })).toHaveStyle('Done');
    expect(component.getByRole('button', { name: 'T' })).toHaveStyle('Selected');
    expect(component.getByRole('button', { name: 'W' })).toHaveStyle('Empty');
  });
});
