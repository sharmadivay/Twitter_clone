import PropTypes from 'prop-types';
import "./SidebarOptions.css";

function SidebarOptions({ active, text, Icon }) {
  return (
    <div className={`sidebarOptions ${active && "sidebarOptions--active"}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}
SidebarOptions.propTypes = {
    active: PropTypes.bool,
    text: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
  };
export default SidebarOptions;