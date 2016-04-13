/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2003-2014 IPT - Intellectual Products & Technologies.
 * All rights reserved.
 *
 * The contents of this file are subject to the terms of either the GNU
 * General Public License Version 2 with Classpath Exception only ("GPL"). 
 * You may use this file only in compliance with GPL. You can find a copy 
 * of GPL in the root directory of this project in the file named LICENSE.txt.
 *
 * When distributing the software, include this License Header Notice in each
 * file and include the GPL file named LICENSE.txt in the root directory of 
 * the project.
 *
 * GPL Classpath Exception:
 * IPT - Intellectual Products & Technologies (IPT) designates this particular 
 * file as subject to the "Classpath" exception as provided by IPT in the GPL 
 * Version 2 License file that accompanies this code.
 *
 * Modifications:
 * If applicable, add the following below the License Header, with the fields
 * enclosed by brackets [] replaced by your own identifying information:
 * "Portions Copyright [year] [name of copyright owner]"
 *
 */
package userman.resource;

import java.util.List;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.MediaType.APPLICATION_XML;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import userman.controller.UserController;
import userman.model.User;


/**
 * 
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */

@Path("/users")
public class UsersResource {
    private UserController userController = new UserController();
    @Inject
    UriInfo uriInfo;
    
    @GET
    @Produces({APPLICATION_XML, APPLICATION_JSON})
    public List<User> getAllUsers(){
        return userController.getAllUsers();     
    }
    
    @POST
    @Consumes({APPLICATION_XML, APPLICATION_JSON})
    public Response addUser(User user){
        userController.addUser(user);
        return Response.created(
            uriInfo.getAbsolutePathBuilder()
                    .path(user.getId() + "").build())
                .build();
    }
    
}
