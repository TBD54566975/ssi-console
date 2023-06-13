import { render, cleanup } from '@solidjs/testing-library';
import Intake from './Intake';
import { Router } from '@solidjs/router';

describe('Intake', () => {
    let component;

    beforeEach(() => {
        component = render(() => <Router><Intake /></Router>);
    });

    afterEach(cleanup);

    it('should render the app', () => {
        expect(component).toBeDefined();
    });

    it('should render the header, main, and footer elements once mounted', () => {
        const header = component.container.querySelector('header');
        const main = component.container.querySelector('main');
        const footer = component.container.querySelector('footer');
        expect(component.container).toContainElement(header);
        expect(component.container).toContainElement(main);
        expect(component.container).toContainElement(footer);
    });

    it('should render an error message if not a valid link', () => {
        expect(component.queryByText('Looks like that\'s the wrong link.')).toBeInTheDocument();
    });

    it('should not render an error message given a valid submit link with id', () => {
        vi.stubGlobal("location", {"pathname": "submit/123"});
        component = render(() => <Router><Intake /></Router>);
        expect(component.queryByText('Looks like that\'s the wrong link.')).not.toBeInTheDocument();
    });

    it('should not render an error message given a valid apply link with id', () => {
        vi.stubGlobal("location", {"pathname": "apply/123"});
        component = render(() => <Router><Intake /></Router>);
        expect(component.queryByText('Looks like that\'s the wrong link.')).not.toBeInTheDocument();
    });
});
