import React, { Component } from 'react';
import { BounceRight,FadeIn } from "animate-components";

class ListTest extends Component {
    render() {
        return (
            <>
            <BounceRight duration="1s" timingFunction="ease-out">
                <div className="card border-0">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-5">
                    <h6 class="lh-5 mg-b-0">Latest Crypto News</h6>
                    </div>
                    <div className="col-md-7">
                        <div className="pull-right">
                        <FadeIn duration="3s" timingFunction="ease-out">
                           <button className="btn btn-primary2 btn-sm shadow">Add New</button>
                        </FadeIn>
                            
                        </div>
                        
                    </div>
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control st-login-f" name="title" placeholder="Title" />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control st-login-f" name="title" placeholder="Title" />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control st-login-f" name="title" placeholder="Title" />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control st-login-f" name="title" placeholder="Title" />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control st-login-f" name="title" placeholder="Title" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary2 shadow">Submit Now</button>
                </div>
                
                </div>
                
            </div>
            </BounceRight>
            
            </>
        );
    }
}

export default ListTest;