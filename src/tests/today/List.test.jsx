describe('Todays recipe list tests', () => {
  describe('Todays recipe list renders', () => {
    test('successful render works', () => {
      const component = render(<Today id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('todaysList');

      expect(component.getByRole('button', { name: 'favourite' })).toBeDisabled();
      expect(component.getByRole('button', { name: 'do later' })).toBeVisible();

      expect(component.getByText('test recipe 1')).toBeVisible();
      expect(component.getByRole('link', { name: 'go to recipe' })).toHaveAttribute('href', 'todo');

      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
      expect(component.getByRole('button', { name: 'previous' })).toBeDisabled();
    });
  });
  describe('functions work', () => {
    test('next and previous work', async () => {
      const component = render(<Today id="test" />);

      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
      expect(component.getByRole('button', { name: 'previous' })).toBeDisabled();

      expect(component.getByText('test recipe 1')).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'next' }));

      expect(component.getByText('test recipe 2')).toBeVisible();

      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
      expect(component.getByRole('button', { name: 'previous' })).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'previous' }));

      expect(component.getByText('test recipe 1')).toBeVisible();

      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
      expect(component.getByRole('button', { name: 'previous' })).toBeVisible();
    });
    test('view switch works', async () => {
      const component = render(<Today id="test" />);

      expect(component.getByRole('button', { name: 'favourite' })).toBeDisabled();
      expect(component.getByRole('button', { name: 'do later' })).toBeVisible();

      expect(component.getByText('test recipe 1')).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'do later' }));

      expect(component.getByText('test recipe 2')).toBeVisible();

      expect(component.getByRole('button', { name: 'favourite' })).toBeVisible();
      expect(component.getByRole('button', { name: 'do later' })).toBeDisabled();
    });
  });
});
