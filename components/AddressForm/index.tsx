import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'

interface AddressFormProps {
  handler: (address: string) => void
}

export function AddressForm({ handler }: AddressFormProps) {
  const [values, setValues] = useState({
    address: ''
  })

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    handler(values.address)
  }

  const handleAddressInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((values) => ({
      ...values,
      address: event.target.value,
    }));
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <input
          id="public-key"
          className={styles.formField}
          type="text"
          placeholder="Public Address, e.g. 7C4jsPZpht42Tw6MjXWF56Q5RQUocjBBmciEjDa8HRtp"
          name="firstName"
          value={values.address}
          onChange={handleAddressInputChange}
        />
        <br />
        <button type="submit" className={styles.formButton}>
          Check SOL Balance
        </button>
      </form>
    </div>
  )
}
