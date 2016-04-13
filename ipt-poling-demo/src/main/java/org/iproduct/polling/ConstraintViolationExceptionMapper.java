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
package org.iproduct.polling;

import java.util.Set;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.mvc.Models;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import org.iproduct.polling.beans.ErrorsBean;

/**
 *
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */
@Provider
@RequestScoped
public class ConstraintViolationExceptionMapper
        implements ExceptionMapper<ConstraintViolationException> {

    @Inject
    private ErrorsBean errors;
    
//    @Inject
//    Models models;

    @Override
    public Response toResponse(ConstraintViolationException ex) {
        System.out.println("!!!!!!!!!!!!!!!!!!! Constraint Violation EXCEPTION cought: " + ex);
        final Set<ConstraintViolation<?>> violations = ex.getConstraintViolations();
        if (!violations.isEmpty()) {
            for(ConstraintViolation cv : violations){
                errors.getMessages().add("Invalid value: '" + cv.getInvalidValue() 
                    + "' for " + cv.getPropertyPath() 
                    + ". Error message: " + cv.getMessage());
            }
        }
//        models.put("errors", errors);
        return Response.status(Response.Status.BAD_REQUEST).entity("errors.jsp").build();
    }
}
