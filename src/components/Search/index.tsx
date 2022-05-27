import Input from "components/Input";
interface IProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (event: any) => void;
}
export default function Search(props: IProps) {
  const { id, label, name, value, onChange } = props;
  return (
    <div>
      <Input
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
