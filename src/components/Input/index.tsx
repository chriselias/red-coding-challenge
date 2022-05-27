import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

interface IProps {
  id: string;
  placeholder?: string;
  name: string;
  label: string;
  value?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: IProps) {
  const { id, name, label, value, onChange, required } = props;

  return (
    <Paper variant="outlined">
      <TextField
        id={id}
        name={name}
        label={label}
        type="text"
        value={value}
        onChange={onChange}
        size="small"
        variant="outlined"
        fullWidth
        required={required}
      />
    </Paper>
  );
}
