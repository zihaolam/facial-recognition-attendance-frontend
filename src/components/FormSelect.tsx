import { FC } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { useQuery } from "react-query";
import ReactSelect from "react-select";

interface FormOption {
  value: any;
  label: string;
}

interface FormSelectProps {
  control: Control<any>;
  options?: FormOption[];
  optionKey?: string;
  query?: () => Promise<FormOption[]>;
  name: string;
  label: string;
}

const FormSelect: FC<FormSelectProps> = ({
  control,
  options,
  query,
  name,
  label,
}) => {
  const loadOptions = query ? query : () => Promise.resolve(options);

  const { data: asyncOptions, isLoading } = useQuery(
    ["optionKey"],
    loadOptions,
    { enabled: Boolean(query) }
  );

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value: currentSelectedOptions } }) => (
          <ReactSelect
            options={options || asyncOptions}
            isLoading={isLoading}
            value={
              (options || asyncOptions)?.filter(
                (option: { value: string; label: string }) =>
                  currentSelectedOptions.includes(option.value)
              ) || []
            }
            isMulti
            onChange={(selectedOptions) => {
              onChange(selectedOptions.map((option) => option.value));
            }}
          />
        )}
      />
    </div>
  );
};

export default FormSelect;
