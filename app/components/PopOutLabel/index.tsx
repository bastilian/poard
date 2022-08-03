import { Label } from '@patternfly/react-core/dist/umd/react-core';

interface PopOutLabelProps {
  label: string
  popOutLabel?: string
}

const PopOutLabel: React.FC<PopOutLabelProps> = ({ label, popOutLabel }) => {
  const withPopOutLabel: boolean = popOutLabel && popOutLabel !== '' && parseInt(popOutLabel) !== 0;
  return <span className={withPopOutLabel ? 'withPopOut' : ''}>
    <Label className="popOutLabel">{popOutLabel}</Label>
    <Label color="blue" className="mainLabel">{label}</Label>
  </span>;
};

export default PopOutLabel;
