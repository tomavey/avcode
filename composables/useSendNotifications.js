export const useSendNotifications = () => {
  const { getSetting } = useSettings();
  const supabase = useSupabaseClient();
  const sendNotificationsToDev = ref([{ email: "tom@cofh.com", user_id: "123456" }]);

  let useDev = ref();

  //Process starts here
  const sendNotifications = async (request) => {
    // if request includes "admin", send only to dev email
    if (request.request.toLowerCase().includes("admin".toLowerCase()) || getSetting('useDev')) {
      console.log("Sending notifications to dev: ", request, sendNotificationsToDev.value);
      sendToDev(request)
      return
    }
    await getEmailsAndUserIdsFromModerators();
    sendEmailsToModerators(request)
    console.log('Sending notifications: ', request)
  }

  const sendToDev = async (request) => {
    console.log("Sending notifications to dev: ", request, sendNotificationsToDev.value);
    // console.log('Sending notifications: ', request)
    const email = sendNotificationsToDev.value[0].email;
    const user_id = sendNotificationsToDev.value[0].user_id;
    SendEmail(email, user_id, request)
  }

  let moderatorsData = ref([]);

  const getEmailsAndUserIdsFromModerators = async () => {
    console.log("Getting emails and user_ids from moderators table...");
    try {
      const { data, error } = await supabase
        .from("moderators")
        .select("email, user_id")
        .eq("active", true);

      if (error) {
        throw new Error(error.message);
      }

      let moderators = data.map((moderator) => ({
        email: moderator.email,
        user_id: moderator.user_id,
      }));

      moderators = moderators.filter((moderator) => moderator.email !== null);
      console.log("mods ", moderators);
      moderatorsData.value = moderators;
      console.log("ModsObj ", moderatorsData.value);
    } catch (error) {
      console.error(
        "Failed to get emails and user_ids from moderators table:",
        error
      );
    }
  };


  const currentUrl = computed(() => (process.client ? window.location.host : ""));

  const sendEmailsToModerators = async (request) => {
    console.log("Sending emails to moderators...", request);
    // const moderatorsArray = newRequest.request
    //   .toLowerCase()
    //   .includes("admin".toLowerCase())
    //   ? [{ email: "tom@cofh.com", user_id: "123456" }] //for testing
    //   : moderatorsData.value;
    const moderatorsArray = moderatorsData.value;
    console.log("moderatorsArray: ", moderatorsArray);
    for (const mod of moderatorsArray) {
      await new Promise((resolve) => {
        setTimeout(async () => {
          // console.log("Sending email to: ", mod.email, mod.user_id, request);
          await SendEmail(mod.email, mod.user_id, request);
          resolve();
        }, 5000); // 5 seconds delay
      });
    }
  };

  const SendEmail = async (email, user_id, request) => {
    // console.log("Send Email request.request ", request);
    let url = `${currentUrl.value}/?mid=${user_id}&id=${request.id}`;
    let link = `http://${url}`;
    let msg = {
      personalizations: [
        {
          to: [
            {
              email: email,
              name: "Test User",
            },
          ],
        },
      ],
      from: {
        email: "tom@everhost.io",
        name: "Charis Alliance Prayer Wall",
      },
      subject: "A new Charis Alliance Prayer Wall Request",
      content: [
        {
          type: "text/plain",
          value: user_id,
        },
        {
          type: "text/html",
          value: `<div style="margin: 5px auto; text-align: center;">
              <p>A new charis alliance prayer request has been submitted. Use this link to approve it...<p>
              <p>${link}</p>
              <p>or cut and paste this link into your browser:</p>
              <p> ${url}</p>
              <hr/>
              </div>
              <div style="margin: 5px auto; text-align: left;">
              <p>
                ${request.request || "No request provided"}
              </p>
            </div>`,
        },
      ],
    };
    console.log("msg: ", msg);
    console.log("email: ", email);
    const { data } = await $fetch("/api/sendgrid", {
      method: "POST",
      body: msg,
    });
    // console.log("Email sent successfully!"); // Add this line to log the success message
  };

  const getUseDevSetting = async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "useDev");

      if (error) {
        throw new Error(error.message);
      }

      // console.log("Getting use_dev setting...", data);
      useDev.value = data[0].value;

      useDev.value = getSetting("useDev")

    } catch (error) {
      console.error("Failed to get use_dev setting:", error);
    }
  }

  onMounted(async () => {
    await getUseDevSetting();
    // console.log("useDev: ", useDev.value);
  });

  return {
    sendNotifications,
    useDev,
  }
}