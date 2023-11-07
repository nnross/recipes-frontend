import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react/'
import Footer from '../../../components/Footer.jsx';

describe('Footer tests', () => {
    describe('footer renders', () => {
        test('footer renders correctly', () => {
            const component = render(<Footer id="test" />);

            const container = component.container.querySelector('#test');
            expect(container).not.toBeNull();
            expect(container).toBeVisible();
            expect(container.className).toBe('footer');

            expect(component.getByText('-- todo --')).toBeVisible();
        });
    });
});