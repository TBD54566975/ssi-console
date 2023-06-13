import { render, cleanup } from '@solidjs/testing-library';
import App from './App';
import { useLocation } from '@solidjs/router';

describe('App', () => {
    let component;

    beforeEach(() => {
        vi.mock("./utils/setup");
        vi.mock("@solidjs/router", async () => {
            const actual = await vi.importActual<{}>("@solidjs/router");
            return {
                ...actual,
                useLocation: vi.fn()
            }
        });
        vi.mocked(useLocation).mockReturnValue({
            ...useLocation(),
            "pathname": "/"
        });
        component = render(() => <App />);
    });

    afterEach(cleanup);

    it('should render the app', () => {
        expect(component).toBeDefined();
    });

    it('should load an admin route if pathname === `dids`', () => {
        vi.mocked(useLocation).mockReturnValueOnce({
            ...useLocation(),
            "pathname": "dids"
        })
        component = render(() => <App />);
        const intakeApp = component.container.querySelector('.intake-app');
        expect(component.container).not.toContainElement(intakeApp);
        expect(component.container).toContainElement(component.queryByText('tbd'));
    });

    it('should load an intake route if pathname === `apply`', () => {
        vi.mocked(useLocation).mockReturnValueOnce({
            ...useLocation(),
            "pathname": "apply"
        })
        component = render(() => <App />);
        const intakeApp = component.container.querySelector('.intake-app');
        expect(component.container).toContainElement(intakeApp);
        expect(component.container).not.toContainElement(component.queryByText('tbd'));
    });

    it('should load an intake route if pathname === `submit`', () => {
        vi.mocked(useLocation).mockReturnValueOnce({
            ...useLocation(),
            "pathname": "submit"
        });
        component = render(() => <App />);
        const intakeApp = component.container.querySelector('.intake-app');
        expect(component.container).toContainElement(intakeApp);
        expect(component.container).not.toContainElement(component.queryByText('tbd'));
    });
});
