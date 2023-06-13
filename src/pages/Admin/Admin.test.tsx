import { render, cleanup } from '@solidjs/testing-library';
import Admin from './Admin';
import { Router } from '@solidjs/router';

describe('Admin', () => {
    let component;

    beforeEach(() => {
        vi.mock("../../utils/setup");
        component = render(() => <Router><Admin /></Router>);
    });

    afterEach(cleanup);

    it('should render the app', () => {
        expect(component).toBeDefined();
    });

    it('should show the display name', () => {
        expect(component.container).toContainElement(component.queryByText('tbd'));
    });

    it('should render the header, main, and footer elements once mounted', () => {
        const header = component.container.querySelector('header');
        const main = component.container.querySelector('main');
        const footer = component.container.querySelector('footer');
        expect(component.container).toContainElement(header);
        expect(component.container).toContainElement(main);
        expect(component.container).toContainElement(footer);
    });

    it('should display loading text on new render until onmount callback resolves', () => {
        //re-render the component
        component = render(() => <Router><Admin /></Router>);
        expect(component.queryByText('Loading')).toBeInTheDocument();
    });
});
