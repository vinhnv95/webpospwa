import React from 'react'
 
const LoginForm = (props) => {
	return (
		<section id="login">
		    <div className="container">
		    	<div className="row">
		    	    <div className="col-xs-12">
		        	    <div className="form-wrap">
		                <h1>Log in webpos</h1>
		                    <form id="login-form" autoComplete="off" onSubmit={props.handleSubmit}>
		                        <div className="form-group">
		                            <label htmlFor="username" className="sr-only">Username</label>
		                            <input type="text" 
		                            	name="username" 
		                            	id="username" 
		                            	className="form-control" 
		                            	placeholder="Username"
		                            	onChange={props.handleInputChange} />
		                        </div>
		                        <div className="form-group">
		                            <label htmlFor="key" className="sr-only">Password</label>
		                            <input type="password" 
		                            	name="password" 
		                            	id="password" 
		                            	className="form-control" 
		                            	placeholder="Password"
		                            	onChange={props.handleInputChange} />
		                        </div>
		                        <input type="submit" id="btn-login" className="btn btn-custom btn-lg btn-block" value="Log in" />
		                    </form>
		                    <hr />
		        	    </div>
		    		</div>
		    	</div>
		    </div>
		</section>
	);
}
 
export default LoginForm;