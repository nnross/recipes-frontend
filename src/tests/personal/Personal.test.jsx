describe('Personal page tests', () => {
  describe('Personal page renders', () => {
    test('successful render works', () => {
      const component = render(<Personal id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('personal');

      expect(component.getByRole('button', { name: 'M' })).toBeVisible();
      expect(component.getByRole('button', { name: 'T' })).toBeVisible();
      expect(component.getByRole('button', { name: 'W' })).toBeVisible();
      expect(component.getByRole('button', { name: 'T' })).toBeVisible();
      expect(component.getByRole('button', { name: 'F' })).toBeVisible();
      expect(component.getByRole('button', { name: 'S' })).toBeVisible();
      expect(component.getByRole('button', { name: 'S' })).toBeVisible();

      expect(component.getByRole('button', { name: 'go to todays recipe' })).toHaveAttribute('href', 'TODO');

      expect(component.getByRole('button', { name: 'favourites' })).toBeVisible();
      expect(component.getByRole('button', { name: 'do later' })).toBeVisible();

      expect(component.getByText('test recipe 1')).toBeVisible();
      expect(component.getByText('go to recipe')).toHaveAttribute('href', 'todo');

      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
      expect(component.getByRole('button', { name: 'previous' })).toBeVisible();

      expect(component.getByText('your favourite cuisine')).toBeVisible();
      expect(component.getByText('21 finished recipes')).toBeVisible();
      expect(component.getByText('9 favourite')).toBeVisible();
      expect(component.getByText('10 saved to do later')).toBeVisible();
    });
    test('loading render works', () => {
      const component = render(<Personal id="test" />);

      const load = component.container.querySelectorAll('#test');
      expect(load).toHaveLength(3);
    });
    test('error render works', () => {
      const component = render(<Personal id="test" />);

      expect(component.getByText('an error occurred'));
    });
  });
  describe('functions work', () => {
    test('recipe view switch works', async () => {
      const component = render(<Personal id="test" />);

      expect(component.getByText('test recipe 1')).toBeVisible();
      expect(component.getByText('go to recipe')).toHaveAttribute('href', 'todo');

      await userEvent.click(component.getByRole('button', { name: 'do later' }));

      expect(component.getByText('test recipe 2')).toBeVisible();
      expect(component.getByText('go to recipe')).toHaveAttribute('href', 'todo');
    });
  });
});
