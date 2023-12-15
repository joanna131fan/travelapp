import { useForm, Controller} from "react-hook-form";
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import moment from 'moment';

const ItineraryForm = () => {

  const [minEndDate, setMinDate] = useState(new Date());

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    mode: "all",
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      tripName: "",
      invite: "",
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    e.target.reset();
    console.log(data);
    alert(JSON.stringify(data));
    navigate('/');
    return;
  };

  console.log(errors);

  return (
    <div className="ItineraryForm">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="form">
        <fieldset>
        <h2>Start a New Adventure!</h2>
        <label>Trip Name</label>
        <input
          {...register("tripName", {
            required: "Trip Name is Required...",
            minLength: {
              value: 3,
              message: "Trip Name must be atleast 3 characters long...",
            },
            maxLength: {
              value: 30,
              message: "Trip Name must be atmost 30 characters long...",
            },
          })}
          placeholder="Trip to..."
        />
        <p>{errors.tripName?.message}</p>
        <label>Start Date</label>
          <Controller
            control={control}
            name="startDate"
            rules = {{ required: true }}
            render={({ field }) => (
              <ReactDatePicker
                className="input"
                placeholderText="Select Start Date"
                onChange={(e) => {field.onChange(e);
                                  setMinDate(e); }}
                selected={field.value}
              />
              )}
          />
          <p>{errors.startDate && (<span> Start Date is Required...</span>)}</p>
          <label>End Date</label>
          <Controller
            control={control}
            name="endDate"
            rules = {{ 
              required: true
            }}
            render={({ field }) => (
              <ReactDatePicker
                className="input"
                placeholderText="Select End Date"
                onChange={(e) => field.onChange(e)}
                selected={field.value}
                minDate={minEndDate}
              />
              )}
          />
          <p>{errors.endDate && errors.endDate.type === "required" && (<span> End Date is Required...</span>)}</p>
          <div>
            <label>Invite People</label>
            <textarea {...register("invite")} placeholder="Invite..."/>
          </div>
        <button type="Submit" className="button">Create</button>
        </fieldset>
      </form>
    </div>
  );
}

export default ItineraryForm;