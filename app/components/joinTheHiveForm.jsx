"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { sendJoinTheHiveApplication } from "../utils/emailService";
import Link from "next/link";

const POSITIONS = [
  { id: "graphic_designer", label: "Graphic Designer" },
  { id: "social_media_x", label: "Social Media Manager (X)" },
  { id: "telegram_moderator", label: "Telegram Moderator" },
  { id: "community_manager", label: "Community Manager" },
  { id: "youtube_handler", label: "YouTube Handler" },
  { id: "content_writer", label: "Content Writer" },
  { id: "video_content_creator", label: "Video Content Creator" },
];

export default function JoinTheHiveForm() {
  const [loading, setLoading] = useState(false);
  const positionDefaults = Object.fromEntries(
    POSITIONS.map((p) => [`pos_${p.id}`, false])
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      phone: "",
      xUsername: "",
      tgUsername: "",
      powLink: "",
      ...positionDefaults,
    },
  });

  const onSubmit = async (data) => {
    const selected = POSITIONS.filter((p) => data[`pos_${p.id}`]).map(
      (p) => p.id
    );
    if (selected.length === 0) {
      toast.error("Please select at least one position.");
      return;
    }

    setLoading(true);
    try {
      await sendJoinTheHiveApplication({
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        phone: data.phone,
        positions: selected,
        xUsername: data.xUsername.trim(),
        tgUsername: data.tgUsername.trim(),
        powLink: data.powLink.trim(),
      });
      reset();
      toast.success("Application sent. We’ll be in touch soon.", {
        style: {
          background: "#FFD700",
          color: "#000",
        },
      });
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="join-hive__form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="join-hive__form__note">
        <Link href="/disclosures">Read our Privacy Policy</Link>
      </p>

      <label className="join-hive__label">
        Name <span className="join-hive__req">*</span>
      </label>
      <input
        className="join-hive__input"
        type="text"
        autoComplete="name"
        placeholder="First and last name"
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && (
        <span className="join-hive__error">{errors.name.message}</span>
      )}

      <label className="join-hive__label">Nickname</label>
      <input
        className="join-hive__input"
        type="text"
        placeholder="Optional"
        {...register("nickname")}
      />

      <label className="join-hive__label">
        Email <span className="join-hive__req">*</span>
      </label>
      <input
        className="join-hive__input"
        type="email"
        autoComplete="email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && (
        <span className="join-hive__error">{errors.email.message}</span>
      )}

      <label className="join-hive__label">
        Phone number <span className="join-hive__req">*</span>
      </label>
      <input
        className="join-hive__input"
        type="tel"
        autoComplete="tel"
        {...register("phone", { required: "Phone is required" })}
      />
      {errors.phone && (
        <span className="join-hive__error">{errors.phone.message}</span>
      )}

      <fieldset className="join-hive__fieldset">
        <legend className="join-hive__label">
          Which position(s) are you interested in?{" "}
          <span className="join-hive__req">*</span>
        </legend>
        <div className="join-hive__checkboxes">
          {POSITIONS.map((p) => (
            <label key={p.id} className="join-hive__check">
              <input
                id={`join-pos-${p.id}`}
                type="checkbox"
                {...register(`pos_${p.id}`)}
              />
              <span>{p.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="join-hive__label">
        X username <span className="join-hive__req">*</span>
      </label>
      <input
        className="join-hive__input"
        type="text"
        placeholder="@handle or handle"
        {...register("xUsername", { required: "X username is required" })}
      />
      {errors.xUsername && (
        <span className="join-hive__error">{errors.xUsername.message}</span>
      )}

      <label className="join-hive__label">
        TG username <span className="join-hive__req">*</span>
      </label>
      <input
        className="join-hive__input"
        type="text"
        placeholder="@username"
        {...register("tgUsername", { required: "Telegram username is required" })}
      />
      {errors.tgUsername && (
        <span className="join-hive__error">{errors.tgUsername.message}</span>
      )}

      <label className="join-hive__label">
        Link to proof of work (POW) <span className="join-hive__req">*</span>
      </label>
      <input
        className="join-hive__input"
        type="text"
        inputMode="url"
        placeholder="https://… (portfolio, post, or doc)"
        {...register("powLink", { required: "Proof of work link is required" })}
      />
      {errors.powLink && (
        <span className="join-hive__error">{errors.powLink.message}</span>
      )}

      <button
        type="submit"
        className="join-hive__submit"
        disabled={loading}
      >
        {loading ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
