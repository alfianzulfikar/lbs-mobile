const numberFormat = (value: number | string, convert?: boolean) => {
  if (!(typeof value === 'string' || typeof value === 'number')) {
    return '0';
  }

  if (convert) {
    const satuan = [
      {nilai: 1_000_000_000_000, label: 'Triliun'},
      {nilai: 1_000_000_000, label: 'Milyar'},
      {nilai: 1_000_000, label: 'Jt'},
      {nilai: 1_000, label: 'Ribu'},
    ];

    for (const {nilai, label} of satuan) {
      if (Number(value) >= nilai) {
        const hasil = Number(value) / nilai;
        // Membulatkan 1 angka di belakang koma jika perlu
        const hasilString =
          hasil % 1 === 0
            ? hasil.toString()
            : hasil.toFixed(1).replace('.', ',');
        return `${hasilString} ${label}`;
      }
    }
  }

  let currentValue = typeof value === 'string' ? value : String(value);
  let valueInArray = [currentValue];
  if (currentValue.includes('.')) {
    valueInArray = currentValue.split('.');
    currentValue = valueInArray[0];
  }

  if (currentValue.length >= 3) {
    let newArray = [];
    let newValue = currentValue;
    for (let i = 0; i < Math.ceil(currentValue.length / 3); i++) {
      let part = currentValue.substring(newValue.length - 3, newValue.length);
      newArray.push(part);
      newValue = newValue.substring(0, newValue.length - 3);
    }
    newArray = newArray.reverse();
    return (
      newArray.join('.') +
      (valueInArray.length === 2 ? ',' + valueInArray[1] : '')
    );
  }

  return (
    currentValue + (valueInArray.length === 2 ? ',' + valueInArray[1] : '')
  );
};

export default numberFormat;
