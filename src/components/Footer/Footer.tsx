import Icon, { ExternalArrow } from '../../icons/Icon';
import './Footer.scss';

const Footer = () => {
    return (
        <footer>
            <a target="_blank" href="https://github.com/kirahsapong/ssi-console">Github <Icon svg={ExternalArrow} /></a>
            <a target="_blank" href="https://www.tbd.website/">tbd.website <Icon svg={ExternalArrow} /></a>
        </footer>
    )
}

export default Footer;