"use client";
import { deleteNotificationAction } from "@/app/_lib/actions";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteNotificationButton({ id }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteNotificationAction(id);
      if (res?.code === 200) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    });
  };

  return (
    <button disabled={isPending} onClick={handleDelete}>
      <i className="fa-solid fa-trash-can delete-icon"></i>
    </button>
  );
}
