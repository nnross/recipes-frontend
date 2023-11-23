describe('Personal page statistics list tests', () => {
  describe('Personal page statistics renders', () => {
    test('successful render works', () => {
      const component = render(<Personal id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('statistics');

      expect(component.getByText('Your favourite recipes')).toBeVisible();

      expect(component.getByText('your favourite cuisine')).toBeVisible();
      expect(component.getByText('21 finished recipes')).toBeVisible();
      expect(component.getByText('9 favourite')).toBeVisible();
      expect(component.getByText('10 saved to do later')).toBeVisible();
    });
  });
});
