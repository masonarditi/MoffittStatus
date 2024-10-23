"use client";
import './styles.css';
import { Slider } from "@/components/ui/slider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

// Custom FormMessage Component to Display Errors
interface FormMessageProps {
  error?: string;
}

const FormMessage: React.FC<FormMessageProps> = ({ error }) => (
  <p className="text-red-500 text-sm mt-1">{error}</p>
);

const formSchema = z.object({
  floor: z.enum(["1", "3", "4", "5"], { required_error: "Please select a valid floor." }),
  busyScale: z.enum(["1", "2", "3", "4", "5"], { required_error: "Please provide a valid busy scale." }),
});

const UpdateForm = () => {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      floor: "1",
      busyScale: "3",
    },
  });

  const { handleSubmit, formState: { errors } } = methods;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const currentTime = new Date().toISOString();

    const dataToSubmit = {
      ...values,
      timeStamp: currentTime,
    };

    const res = await fetch('/api/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    });

    if (res.ok) {
      alert('Data saved successfully!');
    } else {
      alert('Failed to save data.');
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <FormProvider {...methods}>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6 bg-white shadow-md p-6 rounded-lg max-w-md w-full"
        >
          {/* Floor Field */}
          <FormField
            control={methods.control}
            name="floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What floor are you on?</FormLabel>
                <FormControl>
                  <div className="flex justify-center gap-2 mt-2">
                    {["1", "3", "4", "5"].map((floor) => (
                      <Button
                        key={floor}
                        type="button"
                        className={`px-4 py-2 rounded-md transition-all duration-300 ${
                          field.value === floor
                            ? "bg-gray-700 text-white"
                            : "bg-gray-300 text-black hover:bg-gray-400"
                        }`}
                        onClick={() => field.onChange(floor)}
                      >
                        Floor {floor}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage error={errors.floor?.message} />
              </FormItem>
            )}
          />

          {/* Busy Scale Field */}
          <FormField
            control={methods.control}
            name="busyScale"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How busy is it? (1-5)</FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center">
                    <Slider
                      value={[Number(field.value)]}
                      min={1}
                      max={5}
                      step={1}
                      defaultValue={[3]}
                      onValueChange={(value) => field.onChange(String(value[0]))}
                      className="w-full"
                    />
                    <div className="mt-2 text-sm text-gray-600 text-center">
                      <strong>Status:</strong>{" "}
                      {Number(field.value) === 1 && "Wide Open"}
                      {Number(field.value) === 2 && "Not Too Busy"}
                      {Number(field.value) === 3 && "Kinda Busy"}
                      {Number(field.value) === 4 && "Very Busy"}
                      {Number(field.value) === 5 && "Extremely Busy"}
                    </div>
                  </div>
                </FormControl>
                <FormMessage error={errors.busyScale?.message} />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300"
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default UpdateForm;
