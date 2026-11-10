package com.cl.dao;

import com.cl.entity.SheyingyuyueEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.SheyingyuyueView;


/**
 * 摄影预约
 * 
 * @author 
 * @email 
 * @date 2026-03-12 19:47:40
 */
public interface SheyingyuyueDao extends BaseMapper<SheyingyuyueEntity> {
	
	List<SheyingyuyueView> selectListView(@Param("ew") Wrapper<SheyingyuyueEntity> wrapper);

	List<SheyingyuyueView> selectListView(Pagination page,@Param("ew") Wrapper<SheyingyuyueEntity> wrapper);
	
	SheyingyuyueView selectView(@Param("ew") Wrapper<SheyingyuyueEntity> wrapper);


    List<Map<String, Object>> selectValue(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<SheyingyuyueEntity> wrapper);

    List<Map<String, Object>> selectTimeStatValue(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<SheyingyuyueEntity> wrapper);

    List<Map<String, Object>> selectGroup(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<SheyingyuyueEntity> wrapper);



}
