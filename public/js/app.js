/*
  eslint-disable react/prefer-stateless-function, react/jsx-boolean-value,
  no-undef, jsx-a11y/label-has-for
*/
class TimersDashboard extends React.Component {
    state = {
        timers: [
          {
            title: 'Practice squat',
            project: 'Gym Chores',
            id: uuid.v4(),
            elapsed: 5456099,
            runningSince: Date.now(),
          }, 
          {
            title: 'Bake squash',
            project: 'Kitchen Chores',
            id: uuid.v4(),
            elapsed: 1273998,
            runningSince: null,
          },
        ],
      }
    
    render() {
      return (
        <div className='ui three column centered grid'>
          <div className='column'>
            <EditableTimerList
                    timers={this.state.timers}
            />
            <ToggleableTimerForm
            />
          </div>
        </div>
      );
    }
  }
  
  class ToggleableTimerForm extends React.Component {
    state = {
        isOpen: false,
    };
    // handleFormOpen is written to toggle the form to open.  It is an arrow function in order to ensure that "this" inside the function is bound to the component.  We're able to avoid
    // using a regular function and the constructor(props) and super(props) along with "this.handleFormOpen = this.handleFormOpen.bind(this)"  by using an arrow function.
    handleFormOpen = () => {
        this.setState({ isOpen: true });
    };
    
    render() {
      if (this.state.isOpen) {
        return (
          <TimerForm />
        );
      } else {
        return (
          <div className='ui basic content center aligned segment'>
            <button 
                className='ui basic button icon'
                onClick={this.handleFormOpen}
            >
              <i className='plus icon' />
            </button>
          </div>
        );
      }
    }
  }
  
  class EditableTimerList extends React.Component {
    render() {
        const timers = this.props.timers.map((timer) => (
            <EditableTimer
              key={timer.id}
              id={timer.id}
              title={timer.title}
              project={timer.project}
              elapsed={timer.elapsed}
              runningSince={timer.runningSince}
            />
          ));
          return (
            <div id='timers'>
              {timers}
            </div>
          );
    }
  }
  
  class EditableTimer extends React.Component {
    
    state = {
        editFormOpen: false,
    };
    
    render() {
      if (this.state.editFormOpen) {
        return (
          <TimerForm
            id={this.props.id}
            title={this.props.title}
            project={this.props.project}
          />
        );
      } else {
        return (
          <Timer
            id={this.props.id}
            title={this.props.title}
            project={this.props.project}
            elapsed={this.props.elapsed}
            runningSince={this.props.runningSince}
          />
        );
      }
    }
  }
  
  class Timer extends React.Component {
    render() {
      const elapsedString = helpers.renderElapsedString(this.props.elapsed);
      return (
        <div className='ui centered card'>
          <div className='content'>
            <div className='header'>
              {this.props.title}
            </div>
            <div className='meta'>
              {this.props.project}
            </div>
            <div className='center aligned description'>
              <h2>
                {elapsedString}
              </h2>
            </div>
            <div className='extra content'>
              <span className='right floated edit icon'>
                <i className='edit icon' />
              </span>
              <span className='right floated trash icon'>
                <i className='trash icon' />
              </span>
            </div>
          </div>
          <div className='ui bottom attached blue basic button'>
            Start
          </div>
        </div>
      );
    }
  }
  
  class TimerForm extends React.Component {
    state = {
        title: this.props.title || ' ',
        project: this.props.project || ' ',
    };

    handleSubmit = () => {
      this.props.onFormSubmit({
        id: this.props.id,
        title: this.state.title,
        project: this.state.project,
      });
    };
    
    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
      };
    
      handleProjectChange = (e) => {
        this.setState({ project: e.target.value });
      };
      
    render() {
      // if  an id is present, then the button text is "update" otherwise create a new timer
      const submitText = this.props.id ? 'Update' : 'Create';
      return (
        <div className='ui centered card'>
          <div className='content'>
            <div className='ui form'>
              <div className='field'>
                <label>Title</label>
                <input 
                    type='text' 
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                    />
              </div>
              <div className='field'>
                <label>Project</label>
                <input 
                    type='text' 
                    value={this.state.project}
                    onChange={this.handleProjectChange}
                    />
              </div>
              <div className='ui two bottom attached buttons'>
                <button 
                  className='ui basic blue button'
                  onClick={this.handleSubmit}
                >
                  {submitText}
                </button>
                <button 
                  className='ui basic red button'
                  onClick={this.handleFormClose}
                  >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <TimersDashboard />,
    document.getElementById('content')
  );
