import { Label } from '@patternfly/react-core/dist/umd/react-core';

const PopOutLabel = ({ label, popOutLabel }) => {
  const withPopOutLabel: string = popOutLabel && popOutLabel !== '' && parseInt(popOutLabel) !== 0;
  return <span className={withPopOutLabel ? 'withPopOut' : ''}>
    <Label className="popOutLabel">{popOutLabel}</Label>
    <Label color="blue" className="mainLabel">{label}</Label>
  </span>;
};

export default PopOutLabel;
