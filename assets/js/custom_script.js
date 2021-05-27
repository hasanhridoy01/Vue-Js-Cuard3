let root = new Vue({
    el : ".root",
    data : {
      jobs : [],
      job : {
        title : "",
        description : "",
        catagory : "",
        budget : "",
        location : "",
        remotelocation : "",
        photo : ""
      },
      single_employee :{
        title : "",
        description : "",
        catagory : "",
        budget : "",
        location : "",
        remotelocation : "",
        photo : ""
      },
      search : "",
      Rsearch : [],
      categorysearch : "",
      allcats : [],
      priceRang : '',
      location : "",
      edit_employee : {
        title : "",
        id : "",
        description : "",
        catagory : "",
        budget : "",
        location : "",
        remotelocation : "",
        photo : ""
      }
    },
    methods : {

      //add jod form Database
      addNewJod : function(event){
        event.preventDefault();
        
        //form validation
        if( this.job.title == "" ||  this.job.description == "" || this.job.catagory == "" || this.job.budget == "" || this.job.location == "" || this.job.remotelocation == ""){
           alert('fill must be empty!');
        }else{

          //get value
          let formData = new FormData;

          //photo upload
          root.job.photo = root.$refs.photo.files[0];

          //value update
          formData.append('title', this.job.title);
          formData.append('description', this.job.description);
          formData.append('catagory', this.job.catagory);
          formData.append('budget', this.job.budget);
          formData.append('location', this.job.location);
          formData.append('remotelocation', this.job.remotelocation);
          formData.append('photo', this.job.photo);

          //add new Jod title with request form axiose
          axios.post('inc/job.php?action=add',formData, {
            header : {
                'Content-Type' : 'multipart/form-data'
            }
          }).then(function(response){
            root.job.title = "",
            root.job.description = "",
            root.job.catagory = "",
            root.job.budget = "",
            root.job.location = "",
            root.job.remotelocation = "",
            root.getAllEmployee();
          });
        }

      },

      //get all employee form Database
      getAllEmployee : function(){
        //axios request form Database
        axios.get('inc/job.php?action=read').then(function(response){
          root.jobs = response.data;
          root.allcats = response.data;
        });
      },

      //show single student
      showSingleEmployee : function(id, event){
        event.preventDefault();

        //axios request form template page
        axios.get('inc/job.php?action=view&id=' + id).then(function(response){
          root.single_employee.title = response.data.title;
          root.single_employee.description = response.data.description;
          root.single_employee.catagory = response.data.catagory;
          root.single_employee.budget = response.data.budget;
          root.single_employee.location = response.data.location;
          root.single_employee.remotelocation = response.data.remotelocation;
          root.single_employee.photo = response.data.photo;
        });
      },

      //data deleted form database
      employeeDelete : function(id, event){
        event.preventDefault();

        let con = confirm('are you sure');
        if( con == true ){
          //axios request form database
          axios.get('inc/job.php?action=delete&id=' + id).then(function(response){
            root.getAllEmployee();
          });
        }else{
          alert('Your Data is Safe');
        }
      },

      //Data Search Form table
      searchData : function(){
        let search_text = root.search;
        axios.get('inc/job.php?action=search&search=' + search_text).then(function(response){
            root.jobs = response.data;
            root.Rsearch = response.data;
        });
      },

      //categorySearch form Database
      categorySearch :function(){
        let categorysearch = root.categorysearch;
        //axios request form Database
        axios.get('inc/job.php?action=categorysearch&categorysearch=' + categorysearch).then(function(response){
          root.jobs = response.data;
        });
      },

      //price range form database
      pricerang : function(){
        let priceRang = root.priceRang;
        //axios request form database
        axios.get('inc/job.php?action=Rangbar&priceRang=' + priceRang).then(function(response){
           root.jobs = response.data;
        });
      },

      //searchLocation form Database
      searchLocation : function(){
        let location = root.location;
        //axios request form database
        axios.get('inc/job.php?action=Location&location=' + location).then(function(response){
          root.jobs = response.data;
        });
      },

      //EditSingleEmployee form Database
      editSingleEmployee : function(id, event){
        event.preventDefault();
        //axios requrst form Database
        axios.get('inc/job.php?action=edit&id=' + id).then(function(response){
          root.edit_employee.title = response.data.title;
          root.edit_employee.id = response.data.id;
          root.edit_employee.description = response.data.description;
          root.edit_employee.catagory = response.data.catagory;
          root.edit_employee.budget = response.data.budget;
          root.edit_employee.location = response.data.location;
          root.edit_employee.remotelocation = response.data.remotelocation;
          root.edit_employee.photo = response.data.photo;
        }); 
      },

      //UpdateJobPost form Database
      UpdateJobPost : function(event){
        event.preventDefault();

        //get Recive form value
        let formData = new FormData();

        formData.append('title', this.edit_employee.title);
        formData.append('id', this.edit_employee.id);
        formData.append('description', this.edit_employee.description);
        formData.append('catagory', this.edit_employee.catagory);
        formData.append('budget', this.edit_employee.budget);
        formData.append('location', this.edit_employee.location);
        formData.append('remotelocation', this.edit_employee.remotelocation);

        //axios request from Database
        axios.post('inc/job.php?action=update', formData, {
          header : {
              'Content-Type' : 'multipart/form-data'
          }
        }).then(function(response){
          root.getAllEmployee();
        });
      }
    },
    created : function(){
      this.getAllEmployee();
    },
    mounted : function(){

    }
});