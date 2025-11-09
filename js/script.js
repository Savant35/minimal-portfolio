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
                        phone: form.phone.value,
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

    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".section-container");

    function handleNavClick(event) {
        event.preventDefault();
        const clickedButton = event.currentTarget;
        const targetId = clickedButton.dataset.target;

        // If the clicked button is already active, do nothing
        if (clickedButton.classList.contains("show")) {
            return;
        }

        // 1. Deactivate ALL buttons and sections
        navItems.forEach(item => item.classList.remove("show"));
        sections.forEach(section => section.classList.remove("active"));

        // 2. Activate the CLICKED button
        clickedButton.classList.add("show");

        // 3. Activate the TARGET section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add("active");
        } else {
            console.error(`No section found with ID: ${targetId}`);
        }
    }

    // Attach event listeners to all nav items
    navItems.forEach(button => {
        button.addEventListener("click", handleNavClick);
    });

});
