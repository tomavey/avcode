const requests = ref([])
const request = ref({})
const deletedRequests = ref([])
const error = ref(null)

const { moderatorObj } = useAuth()

export const useRequests = () => {
  const { dialog, clearDialog, openAddDialog, openEditDialog } = useDialog();
  const { snackbar, showSnackbar } = useSnackbar()
  const { sendNotifications } = useSendNotifications();
  const supabase = useSupabaseClient()
  const route = useRoute();
  const routeQuery = computed(() => route.query);

  const showRequiredFieldsMessage = ref(false);

  const searchString = ref("");

  const showShowOnlyApprovedRequestsCheckBox = computed(() => {
    if (route.query.id) {
      return false;
    }
    return true;
  }
  );



  const fetchRequests = async () => {
    // console.log("route query", typeof routeQuery.value.id);

    //requests_active_view filters our requests that have a date in the deleted_at column, requests does not
    const tableName = "requests_active_view";

    let query = supabase.from(tableName).select("*").limit(requestsLimit.value);

    if (routeQuery.value.id !== undefined) {
      query = query.eq("id", routeQuery.value.id);
    }

    try {
      let { data, error } = await query;

      if (error) {
        throw error;
      }

      requests.value = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const requestsLimit = ref(50);

  const { getSetting } = useSettings()

  onMounted(async () => {
    requestsLimit.value = await getSetting("requestsLimit")
    fetchRequests()
  })

  const fetchDeletedRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .select('*')

      // console.log("deleted requests: ", data)

      deletedRequests.value = data.filter((r) => r.deleted_at !== null).sort((a, b) => new Date(a.deleted_at) - new Date(b.deleted_at));

    } catch (err) {
      error.value = err.message;
    }
  };

  const unDeleteRequest = async (id) => {
    // console.log("Undelete request with id: ", id);
    if (window.confirm("Are you sure you want to undelete this prayer request?")) {
      try {
        const { data, error } = await supabase
          .from("requests")
          .update({ deleted_at: null }) // Update deleted_at with current timestamp
          .eq("id", id) // Match the id
          .select();

        if (error) {
          throw error;
        }
        fetchDeletedRequests();
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };


  ////////////////////////////////
  //filter requests to approvedRequests to notExpiredRequests to filteredRequests to searchedRequests
  ////////////////////////////////

  //filter all requests and return only approved requests 
  //if showOnlyApprovedRequests is true
  const approvedRequests = computed(() => {
    if (showOnlyApprovedRequests.value && !route.query.id) {
      return requests.value.filter(request => request.approved_at !== null);
    }
    return requests.value;
  });

  //filter approved requests and return those that have not expired 
  //unless showExpiredRequests is true
  const notExpiredRequests = computed(() => {
    if (showExpiredRequests.value) {
      return approvedRequests.value;
    }
    return approvedRequests.value.filter(request => !isExpired(request));
  });

  //I am used by notExpiredRequests()
  const isExpired = (request) => {
    if (request.expired_at === null) return false;
    return new Date(request.expired_at) <= new Date();
  };

  //filter notExpiredRequests based on the type of request selected (prayer, praise, all) 
  const filteredRequests = computed(() => {
    return notExpiredRequests.value.filter(request => {
      if (showOnlyPrayerRequests.value) {
        return request.type === "Prayer";
      }
      if (showOnlyPraiseRequests.value) {
        return request.type === "Praise";
      }
      return true;
    });
  });

  //filter filteredRequests based on search string provided
  //The searchedRequest array is returned to display requests
  const searchedRequests = computed(() => {
    try {
      return filteredRequests.value.filter((r) => {
        return (
          r.fname.toLowerCase().includes(searchString.value.toLowerCase()) ||
          r.lname.toLowerCase().includes(searchString.value.toLowerCase()) ||
          r.request.toLowerCase().includes(searchString.value.toLowerCase())
        );
      });
    } catch (error) {
      console.error('Error filtering requests:', error);
      return filteredRequests.value;
    }
  });


  ////////////////////////////////
  //end of request array filters 
  ////////////////////////////////


  const searchedDeletedRequests = computed(() => {
    return deletedRequests.value.filter((r) => {
      return (
        r.fname.toLowerCase().includes(searchString.value.toLowerCase()) ||
        r.lname.toLowerCase().includes(searchString.value.toLowerCase()) ||
        r.request.toLowerCase().includes(searchString.value.toLowerCase())
      );
    });
  });

  const deleteRequest = async (id) => {
    // console.log("Delete request with id: ", id);
    if (window.confirm("Are you sure you want to delete this prayer request?")) {
      try {
        const { data, error } = await supabase
          .from("requests")
          .update({ deleted_at: new Date() }) // Update deleted_at with current timestamp
          .eq("id", id) // Match the id
          .select();

        if (error) {
          throw error;
        }
        requests.value = requests.value.filter((r) => r.id !== id);
        fetchRequests();
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  const deleteOldSoftDeletedRecords = async () => {
    // console.log("deleteOldSoftDeletedRecords")
    if (window.confirm("Are you sure you want to permenantly delete soft deleted requests?")) {
      const daysAgo = new Date();
      const howLongAgo = 4;
      daysAgo.setDate(daysAgo.getDate() - howLongAgo);

      try {
        const { data, error } = await supabase
          .from('requests')
          .delete()
          .lte('deleted_at', threeDaysAgo.toISOString());

        if (error) {
          throw error;
        }

        // console.log('Deleted old soft deleted records');
      } catch (error) {
        console.error('Error deleting old soft deleted records: ', error);
      }
    }
  };

  const approveRequest = async (request) => {
    const moderatorLname = moderatorObj.lname || null
    // console.log(moderatorLname)
    if (request.approved_at === null) {
      let { data, error } = await supabase
        .from("requests")
        .update({ approved_at: new Date(), approved_by: moderatorLname })
        .eq("id", request.id)
        .select();

      if (error) {
        console.error("Error: ", error);
      } else if (data) {
        requests.value = requests.value.map((r) =>
          r.id === request.id ? { ...r, approved_at: new Date(), approved_by: moderatorLname } : r
        );
      }
    } else {
      let { data, error } = await supabase
        .from("requests")
        .update({ approved_at: null })
        .eq("id", request.id)
        .select();

      if (error) {
        console.error("Error: ", error);
      } else if (data) {
        requests.value = requests.value.map((r) =>
          r.id === request.id ? { ...r, approved_at: null } : r
        );
      }
    }
  };

  const validateForm = (request) => {
    // console.log("validateForm: ", request.fname, request.lname);
    if (!request.fname ||
      !request.lname ||
      !request.country ||
      !request.type ||
      !request.request
    ) {
      return false;
    }
    return true;
  };



  const addOrEditRequest = async () => {
    const request = dialog.value.data;
    // console.log("addOrEditRequest: ", request);
    if (!validateForm(request)) {
      showRequiredFieldsMessage.value = true;
      return;
    }
    if (dialog.value.action === "add") {
      try {
        const { data, error } = await supabase
          .from("requests")
          .insert([request])
          .select();

        if (error) {
          throw error;
        }

        request.value = data[0];
        showSnackbar("You request will show on the prayer wall when it is approved.")
        // console.log('show snackbar ', snackbar.value)

        sendNotifications(request.value, request.value.id);

        // requests.value.push(request.value);
      } catch (error) {
        console.error("Error: ", error);
      }
    } else if (dialog.value.action === "edit") {
      try {
        const { data, error } = await supabase
          .from("requests")
          .update(request)
          .match({ id: request.id })
          .select();

        if (error) {
          throw error;
        }

        const index = requests.value.findIndex((r) => r.id === data[0].id);
        // requests.value.splice(index, 1, data[0]);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    fetchRequests();
    clearDialog();
  };

  const heartPulses = ref([]);

  const incrementPrayerCount = async (requestId) => {
    try {
      if (heartPulses.value.includes(requestId)) {
        return;
      }
      // Fetch the request from the database
      const { data: request, error } = await supabase
        .from("requests")
        .select("prayed_for_count")
        .eq("id", requestId)
        .single();

      if (error) {
        throw error;
      }

      // Increment the prayer_for_count by one
      const updatedCount = request.prayed_for_count + 1;

      // Update the database with the incremented count
      const { data: updatedRequest, updateError } = await supabase
        .from("requests")
        .update({ prayed_for_count: updatedCount })
        .eq("id", requestId)
        .single();

      if (updateError) {
        throw updateError;
      }

      // Return the updated request
      heartPulses.value.push(requestId);
      fetchRequests();
      return updatedRequest;
    } catch (error) {
      console.error("Error incrementing prayer count:", error.message);
      throw error;
    }
  }


  const showOnlyPrayerRequests = ref(false);
  const showOnlyPraiseRequests = ref(false);
  const showOnlyApprovedRequests = ref(true);
  const showExpiredRequests = ref(false);

  const showPrayerOnly = () => {
    showOnlyPrayerRequests.value = true;
    showOnlyPraiseRequests.value = false;
    fetchRequests();
  };

  const showPraiseOnly = () => {
    showOnlyPraiseRequests.value = true;
    showOnlyPrayerRequests.value = false;
    fetchRequests();
  };

  const showPrayerAndPraise = () => {
    // console.log("showing both");
    showOnlyPraiseRequests.value = false;
    showOnlyPrayerRequests.value = false;
    fetchRequests();
  };

  const showExpiredOnly = () => {
    showExpiredRequests.value = true;
    fetchRequests();
  }

  const checkMidInUrl = () => {
    if (route.query.mid) {
      showOnlyApprovedRequests.value = false;
    }
  };

  return {
    requests,
    deletedRequests,
    request,
    fetchRequests,
    fetchDeletedRequests,
    deleteRequest,
    unDeleteRequest,
    deleteOldSoftDeletedRecords,
    filteredRequests,
    approvedRequests,
    searchedRequests,
    searchString,
    showOnlyPrayerRequests,
    showOnlyPraiseRequests,
    showOnlyApprovedRequests,
    showExpiredRequests,
    showShowOnlyApprovedRequestsCheckBox,
    checkMidInUrl,
    showPrayerOnly,
    showPraiseOnly,
    showExpiredOnly,
    showPrayerAndPraise,
    approveRequest,
    addOrEditRequest,
    incrementPrayerCount,
    showRequiredFieldsMessage,
    error,
  }
}
