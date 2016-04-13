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
package org.iproduct.polling.jpacontroller;

import java.io.Serializable;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.ParameterExpression;
import javax.persistence.criteria.Root;
import org.iproduct.polling.entity.Alternative;
import org.iproduct.polling.entity.Alternative_;
import org.iproduct.polling.entity.Poll_;
import org.iproduct.polling.entity.Vote;
import org.iproduct.polling.entity.Vote_;
import org.iproduct.polling.jpacontroller.exceptions.NonExistingEntityException;
import org.iproduct.polling.jpacontroller.exceptions.RollbackFailureException;

/**
 *
 *
 * @author Trayan Iliev, IPT [http://iproduct.org]
 */
@Stateless
public class VoteJPAController implements Serializable {

    // injected EntityManager property
    @PersistenceContext(unitName = "PollingPU")
    private EntityManager em;

    public VoteJPAController() {
    }

    public void create(Long altId, Vote vote) throws RollbackFailureException, Exception {
        vote.setId(null);

        Alternative alternative = em.find(Alternative.class, altId);
        if (alternative == null) {
            throw new NonExistingEntityException("Alternative with Id = "
                    + altId + " does not exist");
        }
        vote.setAlternative(alternative);

        em.persist(vote);
        if (alternative != null) {
            alternative.getVotes().add(vote);
            alternative = em.merge(alternative);
        }
    }

    public void edit(Long altId, Vote vote) throws NonExistingEntityException, RollbackFailureException, Exception {
        Alternative alternative = em.find(Alternative.class, altId);
        if (alternative == null) {
            throw new NonExistingEntityException("Alternative with Id = "
                    + altId + " does not exist");
        }
        vote.setAlternative(alternative);
     
        Vote persistentVote = em.find(Vote.class, vote.getId());
        Alternative alternativeOld = persistentVote.getAlternative();
        Alternative alternativeNew = vote.getAlternative();
        if (alternativeNew != null) {
            alternativeNew = em.getReference(alternativeNew.getClass(), alternativeNew.getId());
            vote.setAlternative(alternativeNew);
        }
        vote = em.merge(vote);
        if (alternativeOld != null && !alternativeOld.equals(alternativeNew)) {
            alternativeOld.getVotes().remove(vote);
            alternativeOld = em.merge(alternativeOld);
        }
        if (alternativeNew != null && !alternativeNew.equals(alternativeOld)) {
            alternativeNew.getVotes().add(vote);
            alternativeNew = em.merge(alternativeNew);
        }
    }

    public void destroy(Long id) throws NonExistingEntityException, RollbackFailureException, Exception {
        Vote vote;
        try {
            vote = em.getReference(Vote.class, id);
            vote.getId();
        } catch (EntityNotFoundException enfe) {
            throw new NonExistingEntityException("The vote with id " + id + " no longer exists.", enfe);
        }
        Alternative alternative = vote.getAlternative();
        if (alternative != null) {
            alternative.getVotes().remove(vote);
            alternative = em.merge(alternative);
        }
        em.remove(vote);
    }

    public List<Vote> findVoteEntitiesByPollAltIds(Long pollId, Long altId) {
        return findVoteEntitiesByPollAltIds(pollId, altId, true, -1, -1);
    }

    public List<Vote> findVoteEntitiesByPollAltIds(Long pollId, Long altId, int maxResults, int firstResult) {
        return findVoteEntitiesByPollAltIds(pollId, altId, false, maxResults, firstResult);
    }

    private List<Vote> findVoteEntitiesByPollAltIds(Long pollId, Long altId, boolean all, int maxResults, int firstResult) {
        CriteriaBuilder cb = em.getCriteriaBuilder();

        CriteriaQuery<Vote> q = cb.createQuery(Vote.class);
        Root<Vote> vote = q.from(Vote.class);
        ParameterExpression<Long> pid = cb.parameter(Long.class);
        ParameterExpression<Long> aid = cb.parameter(Long.class);
        q.select(vote).where(cb.and(
            cb.equal(vote.get(Vote_.alternative).get(Alternative_.poll).get(Poll_.id), pid),
            cb.equal(vote.get(Vote_.alternative).get(Alternative_.id), aid)
        ));

        TypedQuery<Vote> query = em.createQuery(q);
        query.setParameter(pid, pollId).setParameter(aid, altId);

        if (!all) {
            query.setMaxResults(maxResults);
            query.setFirstResult(firstResult);
        }
        List<Vote> results = query.getResultList();
        System.out.println(">>>>>>>>>>>>>>>>>>>> Votes: " + results);
        return results;
   }

    public Vote findVote(Long id) {
        return em.find(Vote.class, id);
    }

    public int getVoteCount() {
        CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
        Root<Vote> rt = cq.from(Vote.class);
        cq.select(em.getCriteriaBuilder().count(rt));
        Query q = em.createQuery(cq);
        return ((Long) q.getSingleResult()).intValue();
    }

}
