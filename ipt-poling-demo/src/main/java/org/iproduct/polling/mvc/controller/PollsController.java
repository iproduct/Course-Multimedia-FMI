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
package org.iproduct.polling.mvc.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.mvc.Models;
import javax.mvc.annotation.Controller;
import javax.mvc.annotation.View;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import org.iproduct.polling.beans.ErrorsBean;
import org.iproduct.polling.jpacontroller.AlternativeJPAController;
import org.iproduct.polling.jpacontroller.PollJPAController;
import org.iproduct.polling.entity.Alternative;
import org.iproduct.polling.entity.Poll;
import org.iproduct.polling.entity.Vote;
import org.iproduct.polling.jpacontroller.VoteJPAController;

/**
 *
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */
@Controller
@Path("/polls")
@RequestScoped
public class PollsController {

    @Inject
    Models models;
    
    @Inject
    ErrorsBean errors;

    @Inject
    AlternativeJPAController alternativeController;

    @Inject
    PollJPAController pollController;

    @Inject
    VoteJPAController voteController;

    @GET
    @Path("/add")
    @View("add_poll.jsp")
    public void addPoll() {}

    @POST
    @Path("/add")
    public String postPollWithAlternatives(
            @NotNull @Size(min=1, max=45) @FormParam("title") String title,
            @NotNull @Size(min=1, max=80) @FormParam("question") String question,
            @Pattern(regexp="\\d{4}-\\d{2}-\\d{2}") @FormParam("from") String from,
            @Pattern(regexp="\\d{4}-\\d{2}-\\d{2}") @FormParam("to") String to,
            @FormParam("alternatives") String alternatives) {
        System.out.println("!!!!" + title + ", " + question + ", " + from + ", " + to + ", " + alternatives);
        boolean valid = true;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date fromDate = null, toDate = null;
        try {
            fromDate = sdf.parse(from);
        } catch (ParseException e) {
            errors.getMessages().add("Invalid From date.");
            valid = false;
        }
        try {
            toDate = sdf.parse(to);
        } catch (ParseException e) {
            errors.getMessages().add("Invalid To date.");
            valid = false;
        }
        List<String> parsedAlternatives = Arrays.asList(alternatives.split("\\|"))
                .stream().map(s -> s.trim()).filter(s -> s.length() > 0)
                .collect(Collectors.toList());
        System.out.println(parsedAlternatives);
        if (valid) {
            try {
                Poll poll = new Poll(title, question, fromDate, toDate);
                pollController.create(poll);

                List<Alternative> altList = new ArrayList<>();
                for (int i = 0; i < parsedAlternatives.size(); i++) {
                    Alternative alt = new Alternative(parsedAlternatives.get(i), i + 1, poll);
                    alternativeController.create(poll.getId(), alt);
                }
            } catch (ConstraintViolationException ex) {
                ex.getConstraintViolations().stream().forEach(
                    (ConstraintViolation cv) -> {
                        System.out.println(cv);
                        errors.getMessages().add(cv.getMessage());
                    }); 
                valid = false;
            } catch (Exception ex) {
                errors.getMessages().add("Error creating the poll on server.");
                Logger.getLogger(PollsController.class.getName())
                        .log(Level.SEVERE, null, ex);
                valid = false;
            }
        }
        if (valid) {
           return "redirect:/";
        } else {
           return "add_poll.jsp";
        }
    }
    
    @GET
    @Path("/{pollId}")
    public String showPollDetailsPage(@PathParam("pollId") Long pollId) {
        models.put("selectedPoll", pollController.findPoll(pollId)); //latest 12 polls
        return "poll_details.jsp";
    }

    @GET
    @Path("/{pollId}/delete")
    public String deletePoll(@PathParam("pollId") Long pollId) {
        System.out.println("!!!!!!!!!DELETE Poll with ID = " + pollId);
        try {
            pollController.destroy(pollId);
        } catch (Exception ex) {
            errors.getMessages().add("Error deleting poll.");
            Logger.getLogger(PollsController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "redirect:/polls/manage";
    }

    @POST
    @Path("/{pollId}/vote")
    public String postNewVote(@PathParam("pollId") Long pollId, @FormParam("alternativeId") Long alternativeId) {
        System.out.println("New vote received for " + pollId + ", alterantiveId: " + alternativeId);
        Vote vote = new Vote("anonimous@anonimous.com", null);
        try {
            voteController.create(alternativeId, vote);
        } catch (Exception ex) {
            errors.getMessages().add("Error creating the poll on server.");
            Logger.getLogger(PollsController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "redirect:/polls/" + pollId;
    }

    @GET
    @Path("/manage")
    public String showManagePollsPage() {
        models.put("polls", pollController.findPollEntities()); //All polls
        return "manage_polls.jsp";
    }
    
    @GET
    @Path("/browse")
    public String showBrowsePollsPage() {
        models.put("polls", pollController.findPollEntities()); //All polls
        return "browse_polls.jsp";
    }

    @GET
    @Path("/velocity")
    @Produces("text/html")
    @View("browse_polls_velocity.vm")
    public void showBrowsePollsVelocity() {
        models.put("polls", pollController.findPollEntities()); //All polls
    }

}
