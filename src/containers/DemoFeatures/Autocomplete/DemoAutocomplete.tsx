import { AutocompleteInput } from '@app/components/AutocompleteInput';

export const DemoAutocomplete = () => {
  return (
    <div>
      <h2>Demo autocomplete input</h2>
      <AutocompleteInput data={['Toán', 'Lí', 'Hóa', 'Sinh', 'Sử', 'Địa']} onSelect={console.log} />
    </div>
  );
};
