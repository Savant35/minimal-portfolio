document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const section = document.getElementById("contact-section");
  const resultMsg = document.querySelector(".result-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    resultMsg.classList.remove("error"); // reset any previous state
    section.classList.remove("sent"); // reset animation if resending

    try {
      const res = await fetch(
        "https://n8n.aliarthur.com/webhook-test/dfa18f16-9bfa-449d-8ea3-648fd0fc5502",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
          }),
        }
      );

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      section.classList.add("sent");
      resultMsg.textContent = "Message sent successfully!";

    } catch (err) {
      resultMsg.textContent = "Message failed to send. Please try again later.";
      resultMsg.classList.add("error");
      console.error(err);
    }
  });
});
