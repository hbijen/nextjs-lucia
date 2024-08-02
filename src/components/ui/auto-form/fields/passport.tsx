import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Trash2 } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";
import { FileWithPath, useDropzone } from "react-dropzone";
import { FileWithPreview, ImageCropper } from "../../image-cropper";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { Label } from "../../label";
import { Button } from "../../button";


const accept = {
  "image/*": [],
}

export default function AutoFormPassport({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
  field,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;

  const [file, setFile] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result as string);
        field.onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveClick = (event: any) => {
    event.stopEventPropagation
    setFile("");
    field.onChange("")
  };

  return (
    <FormItem>
      {showLabel && (
        <AutoFormLabel
          label={fieldConfigItem?.label || label}
          isRequired={isRequired}
        />
      )}
      <div className="relative">
        <FormControl>
          <Label htmlFor="passport">
            <Avatar className="h-36 w-32 cursor-pointer rounded-none relative">
              <AvatarImage className="rounded-none" src={file}></AvatarImage>
              <AvatarFallback className="rounded-none">Select</AvatarFallback>
            </Avatar>
            <input id="passport" type="file" hidden={true} {...fieldPropsWithoutShowLabel} onChange={handleFileChange} value={""} />
          </Label>
        </FormControl>
        {file && (
          <div className="absolute top-0 w-32 text-right">
            <Button size="icon" onClick={handleRemoveClick} aria-label="Remove image" variant="ghost" className="text-red-600 hover:bg-red-100">
              <Trash2 size={16} />
            </Button>
          </div>
        )}
      </div>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  )
}
