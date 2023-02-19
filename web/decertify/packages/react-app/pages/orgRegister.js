import { Label, TextInput, Button, Checkbox } from "flowbite-react";

export default function orgReg(){
   return (
    <div>
        <div class="border-solid border-5 border-blue-700 ">
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email1"
                  value="Organization Name"
                />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="name@flowbite.com"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password1"
                  value="Organization Email"
                />
              </div>
              <TextInput
                id="password1"
                type="password"
                required={true}
              />
            </div>
            <Button type="submit">
              Submit
            </Button>
          </form>
        </div>
    </div>
  );
}