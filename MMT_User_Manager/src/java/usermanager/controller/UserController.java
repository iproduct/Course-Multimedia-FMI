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
package usermanager.controller;

import java.util.Date;
import java.util.List;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import usermanager.entity.User;


/**
 * 
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */
@Stateless
public class UserController {
    @PersistenceContext (unitName = "User_ManagerPU")
    EntityManager em; 
    
    public List<User> getAllUsers(){
        
        // get all registered users from db
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> q = cb.createQuery(User.class);
        Root<User> vote = q.from(User.class);
        q.select(vote);
        TypedQuery<User> query = em.createQuery(q);

        List<User> userList = query.getResultList();
        
        return userList;
    }
    
    public User getUsetById(long id){
        return em.find(User.class, id);
    }
    
    public User addUser(User newUser){
        newUser.setRegistrationDate(new Date());
        em.persist(newUser);
        System.out.println(newUser);
        return newUser;
    }
   
}
