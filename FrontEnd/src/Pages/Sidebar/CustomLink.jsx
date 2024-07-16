import PropTypes from 'prop-types';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function CustomeLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <div>
            <Link
                style={{
                    textDecoration: 'none',
                    color: match ? "var(--twitter-color)" : "black"
                }}
                to={to}
                {...props}
            >
                {children}
            </Link>
        </div>
    );
}

CustomeLink.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};

export default CustomeLink;