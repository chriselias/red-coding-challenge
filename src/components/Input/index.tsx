import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";

interface IProps {
  id: string;
  placeholder?: string;
}

export default function Input(props: IProps) {
  const { id, placeholder } = props;

  return (
    <Paper variant="outlined">
      <InputBase placeholder={placeholder} />
    </Paper>
  );
}
