import ReactGA from 'react-ga';

export const initGA = () => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_ID as string);
};

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};
